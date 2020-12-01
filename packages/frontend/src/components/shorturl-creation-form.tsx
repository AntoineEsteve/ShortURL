import { useMutation } from '@apollo/client'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess'
import { memo, useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createShortUrlMutation } from '../graphql/mutations/create-shorturl'
import { listShortUrlsQuery } from '../graphql/queries/list-shorturls'
import { copyInputValueToClipboard } from '../utils/clipboard'
import { createUrlFromShortUrlId } from '../utils/string/url-from-id'
import { urlRegexp } from '../utils/string/url-validation'

interface ShortUrlForm {
    url: string
}

export const ShortUrlCreationForm = memo(() => {
    const shortUrlInputRef = useRef<HTMLInputElement>(null)
    const { handleSubmit, errors, control, reset } = useForm<ShortUrlForm>()
    // TODO: Add types generated from the back?
    const [createShortUrl, { data }] = useMutation(createShortUrlMutation)
    const shortUrl = data?.createShortUrl?.id
        ? createUrlFromShortUrlId(data.createShortUrl.id)
        : undefined
    const onSubmit = async ({ url }: ShortUrlForm) => {
        await createShortUrl({
            variables: { url },
            refetchQueries: [
                { query: listShortUrlsQuery, variables: { onlyUser: false } },
                { query: listShortUrlsQuery, variables: { onlyUser: true } },
            ],
        })
        reset()
    }
    const copyOnClick = useCallback(() => {
        if (shortUrlInputRef.current) {
            copyInputValueToClipboard(shortUrlInputRef.current)
        }
    }, [])
    return (
        <Box m={3}>
            <Container
                component={Paper}
                maxWidth='sm'
                disableGutters={true}
                variant='outlined'
            >
                <Box p={2}>
                    <Typography variant='h4' gutterBottom align='center'>
                        Create a new ShortURL
                    </Typography>
                    <Typography variant='subtitle1' gutterBottom align='center'>
                        Shorten your long URLs for free!
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            display='flex'
                            flexWrap='wrap'
                            alignItems='flex-start'
                            justifyContent='center'
                            mt={-1}
                            ml={-1}
                        >
                            <Box flex='1 1 250px' minWidth={0} mt={1} ml={1}>
                                <Controller
                                    as={TextField}
                                    name='url'
                                    control={control}
                                    defaultValue=''
                                    variant='outlined'
                                    label='Paste the URL to be shortened'
                                    error={!!errors.url}
                                    helperText={
                                        errors.url
                                            ? 'Please enter a valid URL'
                                            : undefined
                                    }
                                    fullWidth={true}
                                    size='small'
                                    rules={{
                                        required: true,
                                        pattern: urlRegexp,
                                    }}
                                />
                            </Box>
                            <Box flex='0 0 auto' minWidth={0} mt={1} ml={1}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    startIcon={
                                        <UnfoldLessIcon
                                            style={{
                                                transform: 'rotate(90deg)',
                                            }}
                                        />
                                    }
                                >
                                    Shorten
                                </Button>
                            </Box>
                        </Box>
                    </form>
                    {shortUrl ? (
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            mt={2}
                        >
                            <Box flex='1 1 250px' minWidth={0}>
                                <TextField
                                    inputRef={shortUrlInputRef}
                                    value={shortUrl}
                                    label='Your ShortURL has been generated:'
                                    fullWidth={true}
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Box>
                            <Box flex='0 0 auto' ml={2}>
                                <IconButton onClick={copyOnClick}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            </Container>
        </Box>
    )
})
