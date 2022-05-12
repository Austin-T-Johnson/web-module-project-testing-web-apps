import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const header = screen.getByText("Contact Form");

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText("First Name*");
    userEvent.type(firstName, "abc");

    const errorMessage = await screen.findAllByTestId("error");
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId("error");
        expect(errorMessages).toHaveLength(3);
    })

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name\*/i);
    userEvent.type(firstName, "abcdefg");

    const lastName = screen.getByLabelText(/last name\*/i);
    userEvent.type(lastName, "onetwothree")

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessage = await screen.findAllByTestId("error");
    expect(errorMessage).toHaveLength(1);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email\*/i);
    userEvent.type(email, "hahabroSIKE");

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name\*/i);
    userEvent.type(firstName, "abcdefg");

    const lastName = screen.getByLabelText(/last name\*/i);
    userEvent.type(lastName, "onetwothree")

    const email = screen.getByLabelText(/email\*/i);
    userEvent.type(email, "hahabrosike@gmail.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
       const displayFirstName = screen.queryByText("abcdefg");
       const displayLastName = screen.queryByText("onetwothree");
       const displayEmail = screen.queryByText("hahabrosike@gmail.com");
       const message = screen.queryByTestId("message");

       expect(displayFirstName).toBeInTheDocument();
       expect(displayLastName).toBeInTheDocument();
       expect(displayEmail).toBeInTheDocument();
       expect(message).not.toBeInTheDocument();
    })
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const firstName = screen.getByLabelText(/first name\*/i);
    userEvent.type(firstName, "abcdefg");

    const lastName = screen.getByLabelText(/last name\*/i);
    userEvent.type(lastName, "onetwothree")

    const email = screen.getByLabelText(/email\*/i);
    userEvent.type(email, "hahabrosike@gmail.com");

    const message = screen.getByLabelText(/message/i);
    userEvent.type(message, "fkfahdle")

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
       const displayFirstName = screen.queryByText("abcdefg");
       const displayLastName = screen.queryByText("onetwothree");
       const displayEmail = screen.queryByText("hahabrosike@gmail.com");
       const displayMessage = screen.queryByText("fkfahdle");

       expect(displayFirstName).toBeInTheDocument();
       expect(displayLastName).toBeInTheDocument();
       expect(displayEmail).toBeInTheDocument();
       expect(displayMessage).toBeInTheDocument();
    })
    

});