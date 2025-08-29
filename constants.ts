
import { User, VerificationStatus, UserRole, LoanListing } from './types';

export const MOCK_USER: User = {
  name: 'Alex Mercer',
  email: 'alex.mercer@email.com',
  phone: '+1 (555) 123-4567',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  balance: 25000.00,
  role: UserRole.BORROWER,
  isVerified: false, // Set to false to trigger verification flow
  verifications: {
    aadhaar: { status: VerificationStatus.NOT_VERIFIED },
    pan: { status: VerificationStatus.NOT_VERIFIED },
    eSignature: { status: VerificationStatus.NOT_VERIFIED },
  },
};

export const MOCK_LOAN_LISTINGS: LoanListing[] = [
  {
    id: 'loan-1',
    borrowerName: 'Jane Doe',
    amount: 10000,
    fundedAmount: 2500,
    tenure: 12,
    interestRate: 12.5,
    riskGrade: 'B',
    purpose: 'Home Renovation',
    isFunded: false,
  },
  {
    id: 'loan-2',
    borrowerName: 'John Smith',
    amount: 50000,
    fundedAmount: 50000,
    tenure: 24,
    interestRate: 10.2,
    riskGrade: 'A',
    purpose: 'Car Purchase',
    isFunded: true,
  },
  {
    id: 'loan-3',
    borrowerName: 'Sam Wilson',
    amount: 5000,
    fundedAmount: 1000,
    tenure: 6,
    interestRate: 18.0,
    riskGrade: 'D',
    purpose: 'Debt Consolidation',
    isFunded: false,
  },
    {
    id: 'loan-4',
    borrowerName: 'Emily Clark',
    amount: 25000,
    fundedAmount: 17500,
    tenure: 36,
    interestRate: 15.1,
    riskGrade: 'C',
    purpose: 'Education',
    isFunded: false,
  },
];