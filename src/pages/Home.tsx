import React, { useEffect } from 'react'

import TopBar from '../components/TopBar'
import WidgetsGrid from '../components/WidgetsGrid'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import ApiWrapper from '../utils/ApiWrapper'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            padding: 50,
        },
        root: {
            flexGrow: 1,
        },
    })
)

type State = {
    loading: boolean
    widgets: string[]
    filteredWidgets: string[]
}

export default function Home() {
    const classes = useStyles()

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
        <div className={classes.root}>
            <TopBar onSearchTextChange={filterWidgets} />
            <div className={classes.content}>
                {state.loading ? (
                    <LinearProgress />
                ) : (
                    <WidgetsGrid widgets={state.filteredWidgets} />
                )}
            </div>
        </div>
    )
}
