export interface Area {
    ID: string;
    LocalizedName: string;
}

export interface LocalsFromAutoComplete {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: Area;
    AdministrativeArea: Area;
}
