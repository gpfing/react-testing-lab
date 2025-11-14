import React from 'react'
import { fireEvent, render, screen, } from '@testing-library/react'
import App from '../../components/App'
import '@testing-library/jest-dom'
import { expect, describe, test, vi } from 'vitest'


describe('Add transactions', () => {
    test('verify its submitted and was sent as post', async () => {
        global.setFetchResponse(global.baseTransactions)
        const { getByPlaceholderText, getByText, findByText } = render(<App />)

        const newTransaction = {date: '2025-11-13', description: 'Rug', category: 'Housing', amount: 9}

        global.setFetchResponse({...newTransaction, id: "18dsf89sf0kenf8"})

        fireEvent.change(getByPlaceholderText('Set Date'), { target: { value: newTransaction.date } });
        fireEvent.change(getByPlaceholderText('Description'), { target: { value: newTransaction.description } });
        fireEvent.change(getByPlaceholderText('Category'), { target: { value: newTransaction.category } });
        fireEvent.change(getByPlaceholderText('Amount'), { target: { value: newTransaction.amount } });
        fireEvent.click(getByText('Add Transaction'))

        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })

        const submittedTransaction = await findByText("Rug");
        expect(submittedTransaction).toBeInTheDocument();  
    })  
})