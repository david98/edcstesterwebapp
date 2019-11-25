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

export type AllWidgetsResponse = {
    widgets: string[]
}

class ApiWrapper {
    getWidgets: () => Promise<string[]> = async () => {
        let requestURL = ApiBaseUrl + 'widgets'

        try {
            let response = await fetch(requestURL, { mode: 'cors' })
            let responseJson: AllWidgetsResponse = await response.json()

            return responseJson.widgets || []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    getWidgetStatus: (
        widgetName: string
    ) => Promise<WidgetStatusResponse> = async (widgetName: string) => {
        let requestURL = ApiBaseUrl + widgetName + '/status'
        try {
            let response = await fetch(requestURL, { mode: 'cors' })
            let responseJson = await response.json()

            if (responseJson) {
                responseJson['status'] =
                    responseJson['status'] === 'enabled'
                        ? WidgetStatus.Enabled
                        : WidgetStatus.Disabled
                return responseJson as Promise<WidgetStatusResponse>
            } else
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

    setWidgetEnable: (
        widgetName: string,
        enabled: boolean
    ) => Promise<void> = async (widgetName: string, enabled: boolean) => {
        let requestURL =
            ApiBaseUrl + widgetName + '/' + (enabled ? 'enable' : 'disable')
        await fetch(requestURL, { method: 'POST', mode: 'cors' })
    }

    setWidgetMode: (widgetName: string, mode: string) => Promise<void> = async (
        widgetName: string,
        mode: string
    ) => {
        let requestURL = ApiBaseUrl + widgetName + '/mode/' + mode
        await fetch(requestURL, { method: 'POST', mode: 'cors' })
    }
}

export default new ApiWrapper()
