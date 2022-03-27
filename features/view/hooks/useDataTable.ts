import { useContext } from 'react';
import { DataTableContext } from '../providers/DataTableProvider';


export const useDataTable = () => {
	return useContext(DataTableContext);
};
