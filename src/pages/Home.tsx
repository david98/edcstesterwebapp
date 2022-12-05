import React, { useCallback, useEffect, useState } from 'react'

import TopBar from '../components/TopBar'
import WidgetsGrid from '../components/WidgetsGrid'
import { LinearProgress } from '@mui/material'
import ApiWrapper from '../utils/ApiWrapper'

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [widgets, setWidgets] = useState<string[]>([])
    const [filteredWidgets, setFilteredWidgets] = useState<string[]>([])

    const filterWidgets = useCallback(
        (word: string) =>
            setFilteredWidgets(
                widgets.filter((widget) =>
                    widget.toLowerCase().includes(word.toLowerCase())
                )
            ),
        [widgets]
    )

    useEffect(() => {
        const loadWidgets = async () => {
            let widgets = await ApiWrapper.getWidgets()
            await setWidgets(widgets)
            await setFilteredWidgets(widgets)
            await setLoading(false)
        }
        loadWidgets()
    }, [setWidgets, setFilteredWidgets, setLoading])

    return (
        <div>
            <TopBar onSearchTextChange={filterWidgets} />
            <div>
                {loading ? (
                    <LinearProgress />
                ) : (
                    <WidgetsGrid widgets={filteredWidgets} />
                )}
            </div>
        </div>
    )
}
