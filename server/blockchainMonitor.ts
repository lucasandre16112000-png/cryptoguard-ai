/**
 * Blockchain Monitor
 * Simulates real-time blockchain transaction monitoring
 * In production, this would connect to actual blockchain nodes via Web3
 */

import { insertTransaction, upsertAddress, insertAlert, updateAddressRiskScore, getTransactions } from "./db";
import { analyzeTransaction, calculateAlertSeverity, calculateAddressRiskScore } from "./mlEngine";

/**
 * Generate a random Ethereum-style address
 */
function generateRandomAddress(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

/**
 * Generate realistic transaction data
 */
function generateMockTransaction(network: "ethereum" | "bsc" | "polygon") {
  const now = new Date();
  
  // Generate realistic values
  const valueTypes = [
    () => (Math.random() * 10 * 1e18).toString(), // 0-10 ETH (normal)
    () => (Math.random() * 100 * 1e18).toString(), // 0-100 ETH (medium)
    () => ((50 + Math.random() * 200) * 1e18).toString(), // 50-250 ETH (suspicious)
  ];
  
  const valueType = Math.random();
  const value = valueType < 0.7 ? valueTypes[0]!() : valueType < 0.9 ? valueTypes[1]!() : valueTypes[2]!();
  
  const gasPrice = ((20 + Math.random() * 100) * 1e9).toString(); // 20-120 Gwei
  const gasUsed = (21000 + Math.floor(Math.random() * 200000)).toString();
  
  const txHash = '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  return {
    txHash,
    network,
    fromAddress: generateRandomAddress(),
    toAddress: generateRandomAddress(),
    value,
    gasPrice,
    gasUsed,
    blockNumber: 18000000 + Math.floor(Math.random() * 100000),
    timestamp: now,
  };
}

/**
 * Process a single transaction
 */
export async function processTransaction(txData: ReturnType<typeof generateMockTransaction>) {
  try {
    // Analyze transaction with ML engine
    const analysis = await analyzeTransaction({
      value: txData.value,
      gasPrice: txData.gasPrice,
      gasUsed: txData.gasUsed,
      fromAddress: txData.fromAddress,
      toAddress: txData.toAddress,
      network: txData.network,
      timestamp: txData.timestamp,
    });

    // Insert transaction into database
    const transaction = await insertTransaction({
      txHash: txData.txHash,
      network: txData.network,
      fromAddress: txData.fromAddress,
      toAddress: txData.toAddress,
      value: txData.value,
      gasPrice: txData.gasPrice,
      gasUsed: txData.gasUsed,
      blockNumber: txData.blockNumber,
      timestamp: txData.timestamp,
      isSuspicious: analysis.isSuspicious,
      riskScore: analysis.riskScore,
      riskFactors: JSON.stringify(analysis.riskFactors),
      mlPrediction: analysis.mlPrediction,
      mlConfidence: analysis.mlConfidence,
    });

    if (!transaction) return null;

    // Update or create address records
    await upsertAddress({
      address: txData.fromAddress,
      network: txData.network,
      riskScore: 0, // Will be updated below
      label: null,
      totalTransactions: 0,
      suspiciousTransactions: 0,
    });

    await upsertAddress({
      address: txData.toAddress,
      network: txData.network,
      riskScore: 0,
      label: null,
      totalTransactions: 0,
      suspiciousTransactions: 0,
    });

    // Update address risk scores
    const fromTxs = await getTransactions({ limit: 100 });
    const fromRiskScore = await calculateAddressRiskScore(fromTxs);
    await updateAddressRiskScore(transaction.id, fromRiskScore);

    // Generate alert if suspicious
    if (analysis.isSuspicious && analysis.riskScore >= 60) {
      const severity = calculateAlertSeverity(analysis.riskScore);
      
      await insertAlert({
        transactionId: transaction.id,
        severity,
        title: `${severity.toUpperCase()} Risk Transaction Detected`,
        description: `Transaction ${txData.txHash.substring(0, 10)}... flagged with risk score ${analysis.riskScore}/100. ${analysis.riskFactors.join(', ')}`,
        riskFactors: JSON.stringify(analysis.riskFactors),
        isRead: false,
        isResolved: false,
        resolvedBy: null,
        resolvedAt: null,
      });
    }

    return transaction;
  } catch (error) {
    console.error('[BlockchainMonitor] Error processing transaction:', error);
    return null;
  }
}

/**
 * Start monitoring blockchain (simulated)
 */
export function startMonitoring(intervalMs: number = 5000) {
  console.log('[BlockchainMonitor] Starting blockchain monitoring...');
  
  const networks: ("ethereum" | "bsc" | "polygon")[] = ["ethereum", "bsc", "polygon"];
  
  const interval = setInterval(async () => {
    // Generate 1-3 transactions per interval
    const txCount = 1 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < txCount; i++) {
      const network = networks[Math.floor(Math.random() * networks.length)]!;
      const txData = generateMockTransaction(network);
      await processTransaction(txData);
    }
  }, intervalMs);

  return () => {
    clearInterval(interval);
    console.log('[BlockchainMonitor] Stopped monitoring');
  };
}

/**
 * Generate initial seed data
 */
export async function generateSeedData(count: number = 50) {
  console.log(`[BlockchainMonitor] Generating ${count} seed transactions...`);
  
  const networks: ("ethereum" | "bsc" | "polygon")[] = ["ethereum", "bsc", "polygon"];
  
  for (let i = 0; i < count; i++) {
    const network = networks[Math.floor(Math.random() * networks.length)]!;
    const txData = generateMockTransaction(network);
    
    // Vary timestamps to create history
    txData.timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    await processTransaction(txData);
  }
  
  console.log('[BlockchainMonitor] Seed data generation complete');
}
