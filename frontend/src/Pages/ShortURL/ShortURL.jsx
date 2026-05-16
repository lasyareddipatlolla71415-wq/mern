import { Button, Stack, Text } from '@mantine/core'
import React, { useState } from 'react'
import { TextInput } from '@mantine/core';
import Service from "../../utils/http";
import { SHORTEN_URL } from "../../utils/urls";
import { showNotification } from '@mantine/notifications';

export const ShortURL = () => {
    const [data, setData] = useState({ originalUrl: '', customUrl: '', title: '' });
    const [shortUrl, setShortUrl] = useState("");
    const service = new Service();

    const handleSubmit = async () => {
        try {
            const response = await service.post(SHORTEN_URL, data);
            setShortUrl(`${window.location.origin}/api/s/${response.shortCode}`);
        } catch (error) {
            showNotification({ title: 'Error', message: error.response?.data?.message ?? 'Something went wrong', color: 'red' });
        }
    }

    if (shortUrl) {
        return <p>{shortUrl}</p>
    }

    return (
        <Stack p="md">
            <TextInput
                label="Original URL"
                withAsterisk
                description="Enter the full URL."
                placeholder="Enter the Url here"
                value={data.originalUrl}
                onChange={(e) => setData({ ...data, originalUrl: e.target.value })}
            />
            <TextInput
                label="Custom URL (optional)"
                description="Enter the Custom URL."
                placeholder="Enter the Url here"
                value={data.customUrl}
                onChange={(e) => setData({ ...data, customUrl: e.target.value })}
            />
            <TextInput
                label="Title (optional)"
                description="Enter the title."
                placeholder="Enter the title here"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Button onClick={handleSubmit} variant="outline" color="rgba(0, 0, 0, 1)">Shorten URL</Button>
        </Stack>
    )
}

export default ShortURL;