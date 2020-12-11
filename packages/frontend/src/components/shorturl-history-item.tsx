import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import React, { memo, useCallback, useContext, useRef } from 'react'
import { UserIdContext } from '../authentication'
import {
    ListShortUrlsDocument,
    ShortUrl,
    useDeleteShortUrlMutation,
} from '../graphql/codegen'
import { copyInputValueToClipboard } from '../utils/clipboard'
import { createUrlFromShortUrlId } from '../utils/string/url-from-id'

export const ShortUrlHistoryItem = memo<{
    shortUrl: ShortUrl
}>(({ shortUrl }) => {
    const [deleteShortUrl] = useDeleteShortUrlMutation()
    const shortUrlInputRef = useRef<HTMLInputElement>(null)
    const copyOnClick = useCallback(() => {
        if (shortUrlInputRef.current) {
            copyInputValueToClipboard(shortUrlInputRef.current)
        }
    }, [])
    const deleteOnClick = useCallback(() => {
        deleteShortUrl({
            variables: { id: shortUrl.id },
            refetchQueries: [
                {
                    query: ListShortUrlsDocument,
                    variables: { onlyUser: false },
                },
                { query: ListShortUrlsDocument, variables: { onlyUser: true } },
            ],
        })
    }, [deleteShortUrl, shortUrl.id])
    const userid = useContext(UserIdContext)
    return (
        <TableRow key={shortUrl.id}>
            <TableCell component='th' scope='row'>
                <Link
                    href={shortUrl.url}
                    target='_blank'
                    style={{
                        display: 'block',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {shortUrl.url}
                </Link>
            </TableCell>
            <TableCell align='right'>
                <Box display='flex' alignItems='center' mt={-1} ml={-1}>
                    <Box
                        flex='1 1 250px'
                        minWidth={0}
                        justifyContent='center'
                        mt={1}
                        ml={1}
                    >
                        <TextField
                            inputRef={shortUrlInputRef}
                            value={createUrlFromShortUrlId(shortUrl.id)}
                            fullWidth={true}
                            inputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                    <Box flex='0 0 auto' minWidth={0} mt={1} ml={1}>
                        <IconButton onClick={copyOnClick}>
                            <FileCopyIcon />
                        </IconButton>
                    </Box>
                    {userid === shortUrl.userid ? (
                        <Box flex='0 0 auto' minWidth={0} mt={1} ml={1}>
                            <IconButton onClick={deleteOnClick}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ) : null}
                </Box>
            </TableCell>
        </TableRow>
    )
})
