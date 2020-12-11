import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import React, { memo, useCallback, useContext } from 'react'
import {
    ListShortUrlsDocument,
    ShortUrl,
    useDeleteShortUrlMutation,
} from '../graphql/codegen'
import { UserIdContext } from '../user/authentication'
import { copyTextToClipboard } from '../utils/clipboard'
import { createUrlFromShortUrlId } from '../utils/string/url-from-id'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
    createStyles({
        preventOverflow: {
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        listItemSecondaryAction: {
            flex: '0 0 auto',
            position: 'initial',
            alignSelf: 'center',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: 'none',
            margin: '0 0 0 16px',
        },
    }),
)

export const ShortUrlHistoryItem = memo<{
    shortUrl: ShortUrl
}>(({ shortUrl }) => {
    const classes = useStyles()
    const [deleteShortUrl] = useDeleteShortUrlMutation()
    const shortenUrl = createUrlFromShortUrlId(shortUrl.id)
    const copyOnClick = useCallback(() => copyTextToClipboard(shortenUrl), [
        shortenUrl,
    ])
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
        <>
            <ListItemText
                primary={
                    <Link
                        className={classes.preventOverflow}
                        href={shortUrl.url}
                        target='_blank'
                    >
                        {shortUrl.url}
                    </Link>
                }
                secondary={
                    <div className={classes.preventOverflow}>{shortenUrl}</div>
                }
            />
            <ListItemSecondaryAction
                className={classes.listItemSecondaryAction}
            >
                <IconButton onClick={copyOnClick}>
                    <FileCopyIcon />
                </IconButton>
                {userid === shortUrl.userid ? (
                    <IconButton onClick={deleteOnClick}>
                        <DeleteIcon />
                    </IconButton>
                ) : null}
            </ListItemSecondaryAction>
        </>
    )
})
