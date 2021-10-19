import React from "react";
import {getAllByTestId, render, within} from "@testing-library/react";
import App  from "./App";
import {
    mockGetComputedSpacing,
    mockDndElSpacing,
    DND_DRAGGABLE_DATA_ATTR,
    DND_DIRECTION_LEFT,
    DND_DIRECTION_RIGHT, makeDnd
} from "react-beautiful-dnd-test-utils/src";
import initialTraits from "./initialTraits";

const createTestTextOrderByTestIdHelper = getAllByTestId => {
    const testTextOrderByTestId = (testId, expectedTexts) => {
        const texts = getAllByTestId(testId).map(x=>x.textContent);
        expect(texts).toEqual(expectedTexts);
    };
    return testTextOrderByTestId;
};

const renderApp = () => {
    const  rt1Utils = render(<App initialData={initialTraits}/>);

    mockDndElSpacing(rt1Utils)

    const makeGetDragEl = text => () => rt1Utils.getByText(text).closest(DND_DRAGGABLE_DATA_ATTR);

    return { makeGetDragEl, ...rt1Utils };
};

describe('App', () => {
    beforeEach(() => {
        mockGetComputedSpacing();
    });

    describe('dnd',()=>{
        test('moves a task left inside a column', async () => {
            const { getByText, getByTestId, makeGetDragEl} = renderApp();

            await makeDnd({
                getByText,
                getDragEl: makeGetDragEl('bravery'),
                direction: DND_DIRECTION_LEFT,
                positions: 2,
            });

            const { getAllByTestId: getAllByTestIdWithinColumn } = within(
                getByTestId('traits'),
            );
            const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
                getAllByTestIdWithinColumn,
            );
            testTextOrderByTestId('task-content', [
                'peace', 'love', 'patience', 'joy', 'perseverance', 'bravery',
            ]);
        });

        test('moves a trait right inside a column', async () => {
            const { getByText, getByTestId, makeGetDragEl} = renderApp();

            await makeDnd({
                getByText,
                getDragEl:makeGetDragEl('peace'),
                direction: DND_DIRECTION_RIGHT,
                positions: 1,
            });

            const  { getAllByTestId: getAllByTestIdWithinColumn} = within(
                getByTestId('traits'),
            );
            const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
                getAllByTestIdWithinColumn,
            );
            testTextOrderByTestId('task-content', [
                'peace', 'love', 'patience', 'joy', 'perseverance', 'bravery',
            ]);
        });
    });
});
