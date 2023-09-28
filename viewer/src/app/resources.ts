export interface Resources {
  'Credential Profile': Format;
  'Credential Format': Format;
  'Key Management': Format;
  'Revocation Algorithm': Format;
  'Signing Algorithm': Format;
  'Issuance Protocol': Format;
  'Presentation Protocol': Format;
  'Trust Management': Format;
}

export interface Format {
  structure: Structure;
  values: { [key: string]: Partial<any> };
}

export interface Structure {
  type: string;
  additionalProperties: boolean;
  properties: Properties;
  required: string[];
  title: string;
}

export class Properties {
  [key: string]: any;
}
export interface Property {
  type: string | string[];
  description: string;
}
