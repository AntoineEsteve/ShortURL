import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import React, { memo } from 'react'
import { useListShortUrlsQuery } from '../graphql/codegen'
import { theme } from '../style/theme'
import { ShortUrlHistoryItem } from './shorturl-history-item'

export const ShortUrlHistory = memo<{ onlyUser: boolean }>(({ onlyUser }) => {
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
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>URL</TableCell>
                                    <TableCell align='right'>
                                        ShortURL / Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.listShortUrls.map((shortUrl: any) => (
                                    <ShortUrlHistoryItem
                                        key={shortUrl.id}
                                        shortUrl={shortUrl}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </Box>
    ) : null
})
