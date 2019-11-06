import { Partner} from './partner';

export class Cliente {
  id: number;
  nombre : string;
  apellido : string;
  createAt: string;
  email: string;
  foto: string;
  partner: Partner;
}
