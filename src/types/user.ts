export interface User {
  id: string;
  email: string;
  username: string;
  linkedWallets: {
    metamask?: string;
    phantom?: string;
  };
  profile: {
    avatar: string;
    firstName: string;
    lastName: string;
    bio: string;
    location: string;
    phone: string;
    privacySettings: {
      showLocation: boolean;
      showContact: boolean;
      showSocial: boolean;
    };
    socialLinks: {
      twitter: string;
      linkedin: string;
      instagram: string;
    };
  };
}