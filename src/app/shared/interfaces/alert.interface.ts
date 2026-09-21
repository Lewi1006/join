export interface Alert {
    message: string;
    type: AlertType;
    duration: number;
}

export enum AlertType {
    Success = 'success',
}
