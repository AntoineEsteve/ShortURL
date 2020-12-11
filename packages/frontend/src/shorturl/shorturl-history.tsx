import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { memo } from 'react'
import { useListShortUrlsQuery } from '../graphql/codegen'
import { theme } from '../style/theme'
import { ShortUrlHistoryItem } from './shorturl-history-item'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            borderRadius: 4,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
        },
    }),
)

export const ShortUrlHistory = memo<{ onlyUser: boolean }>(({ onlyUser }) => {
    const classes = useStyles()
    const { loading, data } = useListShortUrlsQuery({
        pollInterval: 3000,
        variables: {
            onlyUser,
        },
    })
    return !loading && data?.listShortUrls?.length ? (
        <Box m={3}>
            <Container
                component={Paper}
                maxWidth='sm'
                disableGutters={true}
                style={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <Box p={2}>
                    <Typography variant='h4' gutterBottom align='center'>
                        {onlyUser ? 'Your history' : 'Last URLs created'}
                    </Typography>
                    <List className={classes.list}>
                        {data.listShortUrls.map((shortUrl, index) => (
                            <ListItem
                                key={shortUrl.id}
                                divider={index < data.listShortUrls.length - 1}
                            >
                                <ShortUrlHistoryItem shortUrl={shortUrl} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Container>
        </Box>
    ) : null
})
