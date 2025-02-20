export interface IPromotion {
    Nom: string;
    Description: string;
    OffrePourcent?: number;
    OffrePrix?: number;
    Debut: Date;
    Fin: Date;
}