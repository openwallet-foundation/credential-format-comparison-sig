export interface Resources {
  'Credential Profile': Format;
  'Credential Format': Format;
  'Key Management': Format;
  'Revocation Algorithm': Format;
  'Signing Algorithm': Format;
  'Trust Management': Format;
}

export interface Format {
  structure: any;
  values: { [key: string]: Partial<any> };
}
