import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
    Typography,
} from '@mui/material'

import ApiWrapper, { WidgetStatusResponse } from '../utils/ApiWrapper'

type Props = {
    name: string
}

export default function Widget(props: Props) {
    const [loading, setLoading] = useState(true)
    const [enabled, setEnabled] = useState(false)
    const [mode, setMode] = useState('')
    const [availableModes, setAvailableModes] = useState<string[]>([])

    const handleEnabledChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEnabled(event.target.checked)
    }

    const handleModeChange = (event: SelectChangeEvent<string>) => {
        setMode(event.target.value)
    }

    useEffect(() => {
        const loadStatus = async () => {
            let status: WidgetStatusResponse = await ApiWrapper.getWidgetStatus(
                props.name
            )
            await setEnabled(status.enabled)
            await setMode(status.currentMode || '')
            await setAvailableModes(status.availableModes || [])
            await setLoading(false)
        }
        loadStatus()
    }, [props.name])

    useEffect(() => {
        const updateWidget = async () => {
            if (!loading) {
                await ApiWrapper.setWidgetEnable(props.name, enabled)
                await ApiWrapper.setWidgetMode(props.name, mode)
            }
        }
        updateWidget()
    }, [mode, loading, props.name, enabled])

    return (
        <Card
            sx={{
                width: 400,
                height: 250,
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 2,
                paddingBottom: 2,
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" sx={{ width: '100%' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name}
                        </Typography>
                        <Switch
                            sx={{ marginLeft: 'auto' }}
                            id={props.name + '-enable'}
                            checked={enabled}
                            onChange={handleEnabledChange}
                            color="primary"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                    </Stack>

                    <FormControl>
                        <InputLabel
                            id={props.name + '-mode-label'}
                            htmlFor={props.name + '-mode'}
                        >
                            Mode
                        </InputLabel>
                        <Select
                            labelId={props.name + '-mode-label'}
                            value={mode}
                            onChange={handleModeChange}
                            inputProps={{
                                name: 'mode',
                                id: props.name + '-mode',
                            }}
                        >
                            {availableModes.map((modeName) => (
                                <MenuItem
                                    key={props.name + modeName}
                                    value={modeName}
                                >
                                    {modeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </CardContent>
        </Card>
    )
}
