import React, { useEffect } from 'react'

import TopBar from '../components/TopBar'
import WidgetsGrid from '../components/WidgetsGrid'
import { createStyles, makeStyles, Theme, LinearProgress } from '@mui/material'
import ApiWrapper from '../utils/ApiWrapper'

type State = {
    loading: boolean
    widgets: string[]
    filteredWidgets: string[]
}

export default function Home() {

    const [state, setState] = React.useState<State>({
        loading: true,
        widgets: [],
        filteredWidgets: [],
    })

    const filterWidgets = (word: string) =>
        setState({
            ...state,
            filteredWidgets: state.widgets.filter(widget =>
                widget.toLowerCase().includes(word.toLowerCase())
            ),
        })

    const loadWidgets = async () => {
        let widgets = await ApiWrapper.getWidgets()
        setState({
            ...state,
            loading: false,
            widgets,
            filteredWidgets: widgets,
        })
    }

    useEffect(() => {
        loadWidgets()
    }, [])

    return (
        <div>
            <TopBar onSearchTextChange={filterWidgets} />
            <div>
                {state.loading ? (
                    <LinearProgress />
                ) : (
                    <WidgetsGrid widgets={state.filteredWidgets} />
                )}
            </div>
        </div>
    )
}
