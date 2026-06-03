export type RequestType = {
  name: string,
  phone: string,
  type: 'consultation' | 'order';
  service?: string;
}
