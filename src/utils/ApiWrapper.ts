export const ApiBaseUrl: string = 'http://edcstester.com/api/'

export enum WidgetStatus {
    Enabled = 'enabled',
    Disabled = 'disabled',
}

export type WidgetStatusResponse = {
    status?: WidgetStatus
    error?: string
    mode?: string
    availableModes?: string[]
}

class ApiWrapper {
    getWidgets: () => Promise<string[]> = async () => {
        return ['BESS', 'EnergyMonitoring']
    }

    getWidgetStatus: (
        widgetName: string
    ) => Promise<WidgetStatusResponse> = async (widgetName: string) => {
        return {
            status: WidgetStatus.Enabled,
            mode: 'Random',
            availableModes: ['Random', 'Sequential'],
        }
        let requestUrl = ApiBaseUrl + widgetName + '/status'
        try {
            let response = await fetch(requestUrl)
            let responseJson = await response.json()

            if (responseJson)
                return responseJson as Promise<WidgetStatusResponse>
            else
                return {
                    error: 'Unknown error',
                }
        } catch (error) {
            console.log(error)
            return {
                error: error,
            }
        }
    }
}

export default new ApiWrapper()
