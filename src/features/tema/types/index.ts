import type { TemaResponse } from "../../usuario/types";

export interface TemaResponse {

  "id": number,
  "nombre": string,
  "email": string,
  "temas": TemaResponse[]

}
