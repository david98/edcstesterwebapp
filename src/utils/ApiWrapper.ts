export const ApiBaseUrl: string = 'http://edcstester.com/api/v1/'

export enum WidgetStatus {
    Enabled = 'enabled',
    Disabled = 'disabled',
}

export type WidgetsListResponse = {
    widgets: string[]
}

export type WidgetStatusResponse = {
    enabled: boolean
    currentMode: string
    availableModes: string[]
}

export type WidgetToggleResponse = {
    enabled: boolean
}

export type WidgetModeResponse = {
    currentMode: string
}

export type ErrorResponse = {
    error: string
}

class ApiWrapper {
    getWidgets: () => Promise<string[]> = async () => {
        let requestURL = ApiBaseUrl + 'widgets'

        try {
            let response = await fetch(requestURL, { mode: 'cors' })
            let responseJson: WidgetsListResponse = await response.json()

            return responseJson.widgets
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    getWidgetStatus: (widgetName: string) => Promise<WidgetStatusResponse> =
        async (widgetName: string) => {
            let requestURL = ApiBaseUrl + 'widgets/' + widgetName
            try {
                let response = await fetch(requestURL, { mode: 'cors' })
                let responseJson = await response.json()

                return responseJson as WidgetStatusResponse
            } catch (error) {
                console.log(error)
                throw error
            }
        }

    setWidgetEnable: (
        widgetName: string,
        enabled: boolean
    ) => Promise<WidgetToggleResponse | ErrorResponse> = async (
        widgetName: string,
        enabled: boolean
    ) => {
        try {
            let requestURL =
                ApiBaseUrl +
                'widgets/' +
                widgetName +
                '/' +
                (enabled ? 'enable' : 'disable')
            let response = await fetch(requestURL, {
                method: 'POST',
                mode: 'cors',
            })
            let responseJson = await response.json()

            if (responseJson.enabled !== enabled) {
                throw new Error('Widget toggle fail!')
            } else if (response.status !== 200) {
                return responseJson as ErrorResponse
            } else {
                return responseJson as WidgetToggleResponse
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    setWidgetMode: (widgetName: string, mode: string) => Promise<void> = async (
        widgetName: string,
        mode: string
    ) => {
        try {
            let requestURL = ApiBaseUrl + 'widgets/' + widgetName + '/mode'
            await fetch(requestURL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newMode: mode }),
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default new ApiWrapper()
