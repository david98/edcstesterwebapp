import React, { useEffect } from 'react'
import {Switch, InputLabel, Select, MenuItem, Paper, FormControl, createStyles, makeStyles, Theme, Container, CircularProgress} from '@mui/material'

import ApiWrapper, { WidgetStatusResponse } from '../utils/ApiWrapper'

type Props = {
    name: string
}

type State = {
    loading: boolean
    enabled: boolean
    mode: string
    availableModes: string[]
}

export default function Widget(props: Props) {

    const [state, setState] = React.useState<State>({
        loading: true,
        enabled: false,
        mode: '',
        availableModes: [],
    })

    const loadStatus = async () => {
        let status: WidgetStatusResponse = await ApiWrapper.getWidgetStatus(
            props.name
        )
        await setState({
            ...state,
            enabled: status.enabled,
            mode: status.currentMode || '',
            availableModes: status.availableModes || [],
            loading: false,
        })
    }

    const updateWidget = async () => {
        if (!state.loading) {
            await ApiWrapper.setWidgetEnable(props.name, state.enabled)
            await ApiWrapper.setWidgetMode(props.name, state.mode)
        }
    }

    const handleEnabledChange = (name: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setState({ ...state, [name]: event.target.checked })
    }

    const handleModeChange = (name: keyof typeof state) => (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setState({
            ...state,
            [name]: event.target.value,
        })
    }

    useEffect(() => {
        loadStatus()
    }, [])

    useEffect(() => {
        updateWidget()
    }, [state.enabled, state.mode])

    return (
        <Paper >
            {state.loading ? (
                <CircularProgress />
            ) : (
                <Container maxWidth={'sm'}>
                    <div >
                        <h2>{props.name}</h2>
                        <FormControl>
                            <Switch
                                id={props.name + '-enable'}
                                checked={state.enabled}
                                onChange={handleEnabledChange('enabled')}
                                value="enabled"
                                color="primary"
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        </FormControl>
                    </div>
                    <FormControl >
                        <InputLabel
                            id={props.name + '-mode-label'}
                            htmlFor={props.name + '-mode'}
                        >
                            Mode
                        </InputLabel>
                        <Select
                            labelId={props.name + '-mode-label'}
                            value={state.mode}
                            // onChange={handleModeChange('mode')}
                            inputProps={{
                                name: 'mode',
                                id: props.name + '-mode',
                            }}
                        >
                            {state.availableModes.map(modeName => (
                                <MenuItem
                                    key={props.name + modeName}
                                    value={modeName}
                                >
                                    {modeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Container>
            )}{' '}
        </Paper>
    )
}
