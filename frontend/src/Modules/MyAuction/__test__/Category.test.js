import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Category from "../components/Category";
import { REMOVE_PLAYER_CATEGORY } from "../../../Queries/Players/Mutation/REMOVE_PLAYER";
import { REMOVE_CATEGORY } from "../../../Queries/Category/Mutation/REMOVE_CATEGORY";
import { loginContext } from "../../Context/UserContext";

const mockRefreshData = jest.fn();

const mockData = [
  {
    auctionid: 110,
    category: [
      {
        categoryid: 73,
        category: "a",
        players: [
          {
            playerid: 479,
            playerdob: "2023-09-12T10:37:19.000Z",
            playername: "aaa",
            playerrole: "a",
            playermobile: "9791521808",
          },
        ],
      },
    ],
  },
];

const mockRemovePlayerMutation = [
  {
    request: {
      query: REMOVE_PLAYER_CATEGORY,
      variables: {
        id: 73,
      },
    },
    result: {
      data: {
        removePlayer: true,
      },
    },
  },
];

const mockRemoveCategoryMutation = [
  {
    request: {
      query: REMOVE_CATEGORY,
      variables: {
        id: 73,
      },
    },
    result: {
      data: {
        removeCategory: true,
      },
    },
  },
];

describe("<Category>", () => {
  test("category test", async () => {
    const paramvalue = 0;
    const mockfunction = jest.fn();

    render(
      <MemoryRouter initialEntries={[`/dashboard/category/${paramvalue}`]}>
        <loginContext.Provider
          value={{
            auctionData: mockData,
            loading: false,
            refreshData: mockRefreshData,
            refreshToken: jest.fn(),
          }}
        >
          <MockedProvider
            mocks={[...mockRemovePlayerMutation, ...mockRemoveCategoryMutation]}
            addTypename={false}
          >
            <Routes>
              <Route
                path="/dashboard/category/:value"
                element={<Category onDelete={mockfunction} />}
              />
            </Routes>
          </MockedProvider>
        </loginContext.Provider>
      </MemoryRouter>
    );


    await act(async () => {
      const deleteButton = screen.getByTestId("deleteHandler");
      fireEvent.click(deleteButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockRefreshData).toHaveBeenCalled();
    expect(mockRefreshData).toHaveBeenCalledTimes(1);
  });
});
