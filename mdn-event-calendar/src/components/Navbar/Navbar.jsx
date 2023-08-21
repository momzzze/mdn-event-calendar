import { Link as RouterLink } from 'react-router-dom'
import './Navbar.css'
import { Box, Flex, Link, Spacer, Text } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <>
            <Box bg="blue.500" p={4}>
                <Flex align="center">
                    <Link as={RouterLink} to="/" mr={4}>
                        <Text fontSize="lg" fontWeight="bold" color="white">
                            Home
                        </Text>
                    </Link>
                    <Link as={RouterLink} to="/calendar" mr={4}>
                        <Text fontSize="lg" fontWeight="bold" color="white">
                            Calendar
                        </Text>
                    </Link>                  
                    <Link as={RouterLink} to="/events" mr={4}>
                        <Text fontSize="lg" fontWeight="bold" color="white">
                            Events
                        </Text>
                    </Link>
                    <Link as={RouterLink} to="/contacts">
                        <Text fontSize="lg" fontWeight="bold" color="white">
                            Contacts
                        </Text>
                    </Link>
                    <Spacer />
                    {/* Add any additional elements on the right side */}
                </Flex>
            </Box>
        </>
    )
}

export default Navbar