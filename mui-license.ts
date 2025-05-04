import { LicenseInfo } from '@mui/x-license';

// Set the MUI X license key
try {
  // Replace this with your actual valid license key if you have a paid license
  // For development, this warning message will be shown in console but component will work
  LicenseInfo.setLicenseKey('c0222c0977a14b5e00e7a8abb533651aTz05NDg2NSxFPTE3NTM0NTczNDIwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');
  
  // Simple message to confirm license attempt was made
  console.log('MUI X License key has been set');
} catch (error) {
  console.error('Error setting MUI X license:', error);
}