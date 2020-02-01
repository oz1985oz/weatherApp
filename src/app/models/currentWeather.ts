export interface TemperatureType {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Temperature {
    Metric: TemperatureType;
    Imperial: TemperatureType;
}

export class CurrentWeather {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    IsDayTime: boolean;
    Temperature: Temperature;
    MobileLink: string;
    Link: string;
    locationName?: string;
    locationId?: string;

    constructor(curr: CurrentWeather, locationId: string, LocName: string) {
        this.locationId = locationId;
        this.locationName = LocName;
        this.LocalObservationDateTime = curr.LocalObservationDateTime || null;
        this.EpochTime = curr.EpochTime || null;
        this.WeatherText = curr.WeatherText || null;
        this.WeatherIcon = curr.WeatherIcon || null;
        this.HasPrecipitation = curr.HasPrecipitation || null;
        this.PrecipitationType = curr.PrecipitationType || null;
        this.IsDayTime = curr.IsDayTime || null;
        this.Temperature = curr.Temperature || null;
        this.MobileLink = curr.MobileLink || null;
        this.Link = curr.Link || null;
    }
}
