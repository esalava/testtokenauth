import { create } from 'zustand';

export const usePaginationStore = create((set) => ({
    page: 0,
    rowsPerPage: 10,
    count: 0,
    setPage: (page) => set({ page }),
    setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
    setCount: (count) => set({ count }),
}))