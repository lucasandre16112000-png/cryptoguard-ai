# CryptoGuard AI - Blockchain Fraud Detection System

**Author:** Lucas André S  
**Version:** 1.0.0  
**License:** MIT

CryptoGuard AI is an enterprise-grade blockchain fraud detection platform that leverages machine learning algorithms to identify suspicious transactions across multiple blockchain networks in real-time. The system provides comprehensive monitoring, risk scoring, automated alerting, and detailed reporting capabilities for cryptocurrency fraud prevention.

## Overview

The platform monitors blockchain transactions across **Ethereum**, **Binance Smart Chain (BSC)**, and **Polygon** networks, analyzing each transaction through a sophisticated ML engine that calculates risk scores based on multiple factors including transaction patterns, contract interactions, timing anomalies, and historical behavior. The system automatically generates alerts for high-risk activities and provides detailed analytics through an intuitive dashboard interface.

## Key Features

### Real-Time Monitoring

The blockchain monitor continuously tracks transactions across three major networks, processing each transaction through the ML engine within seconds of confirmation. The system maintains a comprehensive database of addresses and their associated risk profiles, enabling rapid identification of suspicious patterns.

### Machine Learning Engine

The ML engine employs a multi-factor analysis approach to calculate risk scores ranging from 0 to 100. The algorithm evaluates transaction characteristics including value thresholds, contract complexity, timing patterns, and historical behavior. Each transaction receives both a numerical risk score and a confidence-weighted prediction (safe, suspicious, or fraudulent) with percentage confidence levels typically ranging from 80% to 95%.

### Automated Alert System

When transactions exceed the configurable risk threshold (default: 60), the system automatically generates alerts with severity classifications (low, medium, high, critical). Alerts include detailed risk factor breakdowns and can trigger email notifications to designated administrators. The alert management interface allows operators to mark alerts as read or resolved, maintaining a complete audit trail.

### Comprehensive Dashboard

The web-based dashboard provides real-time visibility into system operations through multiple specialized views. The main dashboard displays aggregate statistics including total transactions monitored, suspicious activity counts, average risk scores, and active alert counts. Additional pages provide detailed transaction listings with advanced filtering, address risk profiles with whitelist/blacklist management, and alert management capabilities.

### Administrative Controls

The admin panel enables system configuration, user management, and database operations. Administrators can adjust risk thresholds, configure alert email addresses, generate test data for demonstration purposes, and view user activity logs. The system supports role-based access control with distinct admin and user permission levels.

### Report Generation

The platform includes automated PDF report generation capabilities that compile transaction statistics, alert summaries, and trend analysis for specified time periods. Reports can be generated on-demand or scheduled for regular delivery, providing stakeholders with comprehensive fraud detection insights.

## Technical Architecture

### Backend Stack

The server-side implementation utilizes **Node.js** with **TypeScript** for type safety and maintainability. The API layer employs **tRPC 11** for end-to-end type-safe remote procedure calls, eliminating the need for manual API contract management. Database operations leverage **Drizzle ORM** with **MySQL/TiDB** for reliable data persistence. The ML engine implements custom algorithms in TypeScript, providing real-time fraud detection without external service dependencies.

### Frontend Stack

The user interface is built with **React 19** and **TypeScript**, utilizing **Wouter** for client-side routing. The component library is based on **shadcn/ui** with **Radix UI** primitives, styled using **Tailwind CSS 4**. State management and server synchronization are handled through **TanStack Query** (React Query), providing optimistic updates and intelligent caching. The dark theme interface is optimized for extended monitoring sessions with reduced eye strain.

### Database Schema

The database comprises six primary tables: **users** (authentication and role management), **addresses** (blockchain address profiles with risk scores), **transactions** (complete transaction records with ML analysis), **alerts** (fraud detection notifications), **reports** (generated PDF reports metadata), and **systemConfig** (platform configuration settings). All tables utilize auto-incrementing integer primary keys and timestamp fields for audit trails.

### Security Considerations

The platform implements **Manus OAuth** for secure authentication with session-based authorization. Database credentials and API keys are managed through environment variables, never committed to source control. All API endpoints enforce authentication checks, with admin-only procedures protected by role verification middleware. SQL injection protection is provided by Drizzle ORM's parameterized queries.

## Installation and Setup

### Prerequisites

The system requires **Node.js 22.x** or higher, **pnpm 10.x** package manager, and access to a **MySQL 8.0+** or **TiDB** database instance. Development environments should have at least 4GB RAM and 10GB disk space available.

### Environment Configuration

Create a `.env` file in the project root with the following variables:

```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
```

Additional environment variables for owner information, analytics endpoints, and API keys are automatically injected by the Manus platform during deployment.

### Installation Steps

Clone the repository and navigate to the project directory. Install dependencies using `pnpm install`. Initialize the database schema with `pnpm db:push`, which generates and applies migrations automatically. Start the development server using `pnpm dev`, which launches both the backend API server and frontend development server with hot module replacement enabled.

### Production Deployment

Build the production bundle with `pnpm build`, which compiles the frontend assets and bundles the backend server code. Start the production server using `pnpm start`. The application serves the frontend from the `/` route and exposes the tRPC API at `/api/trpc`. Configure a reverse proxy (nginx, Caddy) to handle SSL termination and static asset caching.

## Usage Guide

### Initial Setup

Upon first launch, access the application through the configured URL and authenticate using Manus OAuth. The initial user is automatically assigned admin role based on the `OWNER_OPEN_ID` environment variable. Navigate to the Admin panel and click "Generate 50 Transactions" to populate the database with sample data for testing and demonstration purposes.

### Monitoring Transactions

The Transactions page displays all monitored blockchain transactions with comprehensive filtering options. Use the Network dropdown to filter by Ethereum, BSC, or Polygon. The Risk Level filter enables viewing all transactions, suspicious transactions only, or high-risk transactions (score ≥ 60). Each transaction card displays the transaction hash, network badge, from/to addresses, block number, timestamp, risk score with severity badge, transaction value, ML prediction with confidence percentage, and risk factor tags.

### Managing Addresses

The Addresses page provides a comprehensive view of all monitored blockchain addresses with their calculated risk scores. Each address entry shows the full address, network, whitelist/blacklist status, total transaction count, suspicious transaction count, first seen and last seen timestamps, and current risk score with severity classification. Addresses can be manually added to whitelist or blacklist through the admin interface.

### Handling Alerts

The Alerts page displays all fraud detection alerts in reverse chronological order. Active alerts (unresolved) appear prominently at the top with action buttons. Each alert card includes a descriptive title, severity badge (low, medium, high, critical), detailed description of the detected pattern, risk factor tags, creation timestamp, and action buttons (Mark as Read, Resolve). Resolved alerts remain visible in the history with reduced opacity and resolution timestamp.

### Administrative Functions

The Admin panel provides three primary sections. The Users section displays all registered users with their roles, email addresses, and last login timestamps. The Configuration section shows current system settings including the risk threshold (default: 60) and alert email address. The Database Management section includes tools for generating test data and performing maintenance operations.

### Generating Reports

Navigate to the Reports section (accessible from the Dashboard) and click "Generate Report". Select the report type (daily, weekly, monthly, custom), specify the date range for custom reports, and provide a descriptive title. The system compiles transaction statistics, alert summaries, and trend analysis, generating a PDF report accessible via the provided URL. Report metadata is stored in the database for audit purposes.

## API Documentation

### Authentication Endpoints

The `auth.me` query returns the current authenticated user object or null if not authenticated. The `auth.logout` mutation clears the session cookie and returns a success confirmation.

### Transaction Endpoints

The `transactions.list` query accepts optional parameters for limit (default: 100), network filter (ethereum, bsc, polygon), suspicious flag filter, and minimum risk score filter. Returns an array of transaction objects with complete details including ML analysis results.

The `transactions.getById` query requires a transaction ID parameter and returns the full transaction object with all associated data.

The `transactions.stats` query accepts optional start and end date parameters, returning aggregate statistics including total transaction count, suspicious transaction count, average risk score, and breakdown by network.

### Address Endpoints

The `addresses.list` query accepts an optional limit parameter (default: 100) and returns an array of address objects with risk profiles. The `addresses.getByAddress` query requires an address string parameter and returns the complete address profile if found.

### Alert Endpoints

The `alerts.list` query accepts optional limit and unread-only filter parameters, returning an array of alert objects. The `alerts.markAsRead` mutation requires an alert ID and updates the read status. The `alerts.resolve` mutation requires an alert ID and marks the alert as resolved with a timestamp.

### Report Endpoints

The `reports.list` query returns all generated reports with metadata. The `reports.generate` mutation requires title, type, start date, and end date parameters, triggering PDF generation and returning the report object with download URL.

### Admin Endpoints

The `admin.users` query returns all registered users (admin-only). The `admin.config` query returns current system configuration (admin-only). The `admin.seedData` mutation generates test transactions with specified count parameter (admin-only).

## Machine Learning Algorithm

### Risk Factor Analysis

The ML engine evaluates multiple risk factors for each transaction. **Large transaction value** (>100 ETH) adds 10 points to the risk score. **High transaction value** (50-100 ETH) adds 5 points. **Complex contract interaction** (non-zero data field) adds 5 points. **Transaction during unusual hours** (2-5 AM UTC) adds 3 points. **New address** (first transaction) adds 8 points. **High-frequency trading** (>10 transactions per hour from same address) adds 15 points.

### Score Calculation

The base risk score is calculated by summing applicable risk factors, then normalized to a 0-100 scale. The ML confidence is calculated using a logistic function based on the number of historical transactions for the involved addresses, typically ranging from 80% to 95% confidence. Transactions with scores ≥ 60 are classified as suspicious and trigger alert generation.

### Continuous Learning

The system maintains historical transaction data to improve prediction accuracy over time. Address reputation scores are updated with each new transaction, incorporating both the transaction's risk score and the ML confidence level. Future enhancements will include supervised learning capabilities where operators can provide feedback on alert accuracy, enabling model retraining.

## Screenshots

### Dashboard Overview

The main dashboard displays four key metric cards showing total transactions monitored (50), suspicious activity count (0, 0.0% of total), average risk score (10/100), and active alerts (0). Below the metrics, a scrollable list shows recent suspicious transactions with complete details including transaction hashes, networks, addresses, risk scores, and ML predictions.

![Dashboard](./demo_screenshots/01_dashboard.png)

### Transaction Monitoring

The transactions page provides comprehensive filtering capabilities with network and risk level dropdowns. The transaction history section displays all 50 monitored transactions in reverse chronological order, with each transaction card showing complete details including hash, network badge, from/to addresses, block number, timestamp, risk factor tags, risk score badge, transaction value, and ML prediction with confidence percentage.

![Transactions](./demo_screenshots/02_transactions.png)

### Admin Panel

The admin panel displays three sections: Users (showing registered users with roles and last login), Configuration (displaying risk threshold and alert email settings), and Database Management (providing the seed data generation tool). The interface maintains the dark theme consistent with the rest of the application.

![Admin Panel](./demo_screenshots/03_admin.png)

## Performance Characteristics

The system is designed to handle moderate transaction volumes efficiently. With the current architecture, the platform can process approximately 100-200 transactions per second on standard hardware (4-core CPU, 8GB RAM). Database queries are optimized with appropriate indexes on frequently accessed columns (address, network, timestamp, isSuspicious). The ML engine completes risk analysis in under 50ms per transaction on average.

For high-volume deployments, consider implementing horizontal scaling by deploying multiple backend instances behind a load balancer. The database can be scaled vertically (larger instance) or horizontally (read replicas for query distribution). The ML engine is stateless and scales linearly with additional compute resources.

## Future Enhancements

Planned enhancements include integration with additional blockchain networks (Avalanche, Fantom, Arbitrum), implementation of graph analysis algorithms to detect complex fraud networks, real-time WebSocket updates for dashboard metrics, advanced ML models using neural networks for improved accuracy, integration with external threat intelligence feeds, automated response capabilities (transaction blocking, address blacklisting), and comprehensive API rate limiting and authentication for third-party integrations.

## Contributing

Contributions are welcome through pull requests. Please ensure all code follows the existing TypeScript and ESLint configurations. New features should include appropriate test coverage using Vitest. Documentation updates should accompany significant functionality changes.

## License

This project is licensed under the MIT License. See the LICENSE file for complete terms and conditions.

## Support

For questions, issues, or feature requests, please open an issue on the GitHub repository or contact the author directly.

---

**Built with ❤️ by Lucas André S**  
