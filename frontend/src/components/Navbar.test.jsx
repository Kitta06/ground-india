import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar'
import { BrowserRouter } from 'react-router-dom'

test('renders navbar with title', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
    const linkElement = screen.getByText(/Ground India/i)
    expect(linkElement).toBeInTheDocument()
})
