import { Button, Stack } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core';
import Service from "../../utils/http";

export const ShortURL = () => {
    const [data, setData] = useState({});
    const [shortUrl, setShortUrl] = useState("");
    const service = new Service();
    const handleSubmit = async () => {
        try {
            const response = await service.post("s", data);
            setShortUrl(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
        }
        catch (error) {
            console.error('Error creating short URL:', error.message);
        }
    }
    useEffect(() => {
        console.log("Short URL created:", {shortUrl});
    }, [shortUrl]);
  return (
    <> {(shortUrl && shortUrl.length > 0) ? <p>{shortUrl}</p> :
    <Stack>
       <TextInput
      label="Original URL"
      withAsterisk
      description="Enter the full URL."
      placeholder="Enter the Url here"
      onChange = {(event) =>
      {
        setData({...data, originalUrl: event.target.value});
      }}
     
    />
       <TextInput
      label="Custom URL (optional)"
      withAsterisk
      onChange = {(event) =>
      {
        setData({...data, customUrl: event.target.value});
      }}
      description="Enter the Custom URL."
      placeholder="Enter the Url here"
      
    />
       <TextInput
      label="title (optional)"
      withAsterisk
      onChange = {(event) =>
      {
        setData({...data, title: event.target.value});
      }}
      description="Enter the title."
      placeholder="Enter the title here"
      
    />

 <Button onClick={handleSubmit} variant="outline" color="rgba(0, 0, 0, 1)">Shorten URL</Button>
    </Stack>
}
    </>
  )
}

export default ShortURL;