import { screen, render, fireEvent, waitFor ,act } from "@testing-library/react";
import Card from "../Components/Card";

describe('Card',()=>{
    test('Card display', ()=>{
        render(<Card>
            <div><h1>Hello</h1></div>
        </Card>)
        expect(screen.getByText('Hello'))
    })

})