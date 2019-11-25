import React, { useEffect } from 'react'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'

import ApiWrapper, {
    WidgetStatus,
    WidgetStatusResponse,
} from '../utils/ApiWrapper'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        title: {
            justifySelf: 'left',
        },
        switch: {
            justifySelf: 'right',
            marginLeft: 'auto',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
)

type Props = {
    name: string
}

type State = {
    loading: boolean
    enabled: boolean
    mode?: string
    availableModes: string[]
}

export default function Widget(props: Props) {
    const classes = useStyles()

    const [state, setState] = React.useState<State>({
        loading: true,
        enabled: false,
        mode: undefined,
        availableModes: [],
    })

    const loadStatus = async () => {
        let status: WidgetStatusResponse = await ApiWrapper.getWidgetStatus(
            props.name
        )
        await setState({
            ...state,
            enabled: status.status === WidgetStatus.Enabled,
            mode: status.mode,
            availableModes: status.availableModes || [],
            loading: false,
        })
        console.log(state.enabled)
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

    const inputLabel = React.useRef<HTMLLabelElement>(null)
    const [labelWidth, setLabelWidth] = React.useState(0)

    useEffect(() => {
        loadStatus()
    }, [])

    useEffect(() => {}, [state.enabled, state.mode])

    return (
        <Paper className={classes.paper}>
            {state.loading ? (
                <LinearProgress />
            ) : (
                <Container maxWidth={'sm'}>
                    <div className={classes.titleContainer}>
                        <h2 className={classes.title}>{props.name}</h2>
                        <FormControl className={classes.formControl}>
                            <Switch
                                id={props.name + '-enable'}
                                className={classes.switch}
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
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id={props.name + '-mode-label'}
                            htmlFor={props.name + '-mode'}
                        >
                            Mode
                        </InputLabel>
                        <Select
                            labelId={props.name + '-mode-label'}
                            value={state.mode}
                            onChange={handleModeChange('mode')}
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
