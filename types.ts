export enum VerificationStatus {
  VERIFIED = 'Verified',
  PENDING = 'Pending',
  NOT_VERIFIED = 'Not Verified',
}

export interface ESignatureData {
    status: VerificationStatus;
    signerName?: string;
    signerEmail?: string;
    signerPhone?: string;
    signatureImage?: string; // URL or base64 string
}

export enum UserRole {
  LENDER = 'lender',
  BORROWER = 'borrower',
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  balance: number;
  role: UserRole;
  isVerified: boolean;
  // Details from verification flow
  dob?: string;
  occupation?: string;
  address?: string;
  monthlySalary?: number;
  payslipUrl?: string; // Represents uploaded payslip
  verifications: {
    aadhaar: { status: VerificationStatus; number?: string };
    pan: { status: VerificationStatus; number?: string };
    eSignature: ESignatureData;
  };
}

export interface VerificationData {
  name: string;
  phone: string;
  dob: string;
  occupation: string;
  address: string;
  monthlySalary: number;
  payslipUrl: string;
  aadhaarNumber: string;
  panNumber: string;
}

export enum View {
    Home = 'home',
    Wallet = 'wallet',
    Profile = 'profile',
    Marketplace = 'marketplace', // For Lenders
    MyLoans = 'my-loans', // For Borrowers
}

export enum LoanStatus {
  DRAFT = 'Draft',
  PENDING_VERIFICATION = 'Pending Verification',
  PENDING_RISK_ASSESSMENT = 'Pending Risk Assessment',
  LISTED = 'Listed on Marketplace',
  FUNDED = 'Fully Funded',
  DISBURSED = 'Disbursed',
  REJECTED = 'Rejected',
  WITHDRAWN = 'Withdrawn',
}

export interface LoanApplication {
  id: string;
  amount: number;
  tenure: number; // in months
  status: LoanStatus;
  submittedAt: string;
}

export interface LoanListing {
  id: string;
  borrowerName: string;
  amount: number;
  fundedAmount: number;
  tenure: number;
  interestRate: number; // APR
  riskGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  purpose: string;
  isFunded: boolean;
}