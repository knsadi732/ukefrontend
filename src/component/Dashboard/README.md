# UK ERP 1.0 Dashboard System

## Overview
This document describes the dashboard system for UK ERP 1.0, a modern SaaS-style construction ERP system. The dashboard provides role-based views with a focus on planning as the central module.

## Dashboard Structure

### 1. Main Dashboard Component
- **File**: `Dashboard.jsx`
- **Responsibilities**:
  - Provides the main layout structure
  - Implements responsive sidebar navigation
  - Manages top navigation bar with notifications
  - Handles authentication and logout

### 2. Sidebar Navigation
- **File**: `Sidebar.jsx`
- **Features**:
  - Role-based module visibility
  - Responsive design (offcanvas for mobile)
  - Intuitive icon-based navigation
  - Planning module as central focus

### 3. Core Dashboard Types

#### Planning Dashboard
- **File**: `components/PlanningDashboard.jsx`
- **Key Features**:
  - Gantt chart visualization
  - Milestone tracking
  - Resource allocation monitoring
  - Planned vs actual progress comparison
  - KPI cards for project metrics

#### Site Level Dashboard
- **File**: `roles/SiteLevelDashboard.jsx`
- **Audience**: Shift I/c, Department I/c, Site I/c, Store I/c, Store Supervisor, Site Admin, Accounts, HR
- **Key Features**:
  - Work order management
  - Checklist status tracking
  - DPR (Daily Progress Report) summaries
  - Recent activities feed
  - Site-specific KPIs

#### Management Dashboard
- **File**: `roles/ManagementDashboard.jsx`
- **Audience**: Project Coordinator, Zonal Manager, Corporate Project Manager, CEO, MD
- **Key Features**:
  - Multi-site and multi-project overviews
  - Financial KPIs and trends
  - Project status monitoring
  - Site performance metrics
  - Resource utilization tracking
  - Notifications and alerts system

#### Role-Specific Dashboard
- **File**: `roles/RoleDashboard.jsx`
- **Purpose**: Customized views for specific roles
- **Supported Roles**:
  - Shift In-charge
  - Department In-charge
  - Site In-charge
  - Store In-charge
  - Store Supervisor
  - Site Admin
  - Accounts
  - HR
  - Project Coordinator
  - Zonal Manager
  - Corporate Project Manager
  - CEO
  - Managing Director

## Modules
The dashboard integrates with the following modules:
1. User/Employee Management
2. Site Management
3. Work Order Management
4. Role & Permission Management
5. Tools/Machinery/Equipment Tracking
6. Checklist Management
7. DPR (Daily Progress Report)
8. Procurement Management
9. Planning (Central Module)
10. Attendance Tracking
11. Payment Management
12. Expense Tracking

## Design Principles
- **Modern SaaS Aesthetics**: Clean blue-white-gray UI with intuitive data visualization
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Role-Based Access**: Tailored views based on user roles and permissions
- **Data-Driven**: KPIs, data cards, and filterable tables for actionable insights
- **Planning-Centric**: Planning module as the central focus with Gantt charts and milestone tracking
- **Export Capabilities**: Data export options for reporting
- **Notifications**: Real-time alerts and notifications system

## Technical Implementation
- **Framework**: React with React Bootstrap
- **Routing**: React Router for navigation
- **Styling**: Bootstrap 5 with custom CSS enhancements
- **Icons**: Bootstrap Icons
- **State Management**: React Hooks for local state management

## Responsive Features
- Desktop-optimized sidebar navigation
- Mobile-friendly offcanvas menu
- Adaptive card layouts for all screen sizes
- Touch-friendly controls and interactions

## Customization
The dashboard can be customized for different roles by:
1. Modifying the role-based module visibility in `Sidebar.jsx`
2. Updating role-specific configurations in `RoleDashboard.jsx`
3. Adjusting KPIs and data displays in each dashboard component