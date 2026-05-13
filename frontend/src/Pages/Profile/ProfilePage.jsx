
import React from 'react'
import { Avatar, Container, Stack, Text } from '@mantine/core';
import Service from '../../utils/http';
import { useState } from 'react';
import { useEffect } from 'react';
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
      try {
        const res = await service.get("user/me");
        setUser(res.data || res); // change
        console.log(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    useEffect(
        () => { fetchUser() }, []
    );

    if (loading) {
      return <Text ta="center" mt="xl">Loading...</Text>;
    }

    if (!user) {
      return (
        <Text ta="center" mt="xl">No user data available.</Text>
      );
    }//change


        return (
 <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
    
    )
}


