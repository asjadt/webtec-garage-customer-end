import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatRole } from '../utils/formatRole';

export default function UseEmployeeForm() {
    // const user = useAuth()
    const business = JSON.parse(localStorage.getItem("userData"))?.business;
    console.log(business)

    const getCombineDataQuery = useQuery({
        queryKey: ["employee-form"],
        queryFn: async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            const { data } = await axios.get(
                `/v1.0/dropdown-options/employee-form`,
                config
            );
            return data;
        },
        select: (data) => {
            // department
            const departments = data.departments?.map((dep) => ({
                id: dep?.id,
                label: dep?.name,
            }));
            // work location
            const work_locations = data.work_locations?.map((dep) => ({
                id: dep?.id,
                label: dep?.name,
            }));
            // designation
            const designations = data.designations?.map((dep) => ({
                id: dep?.id,
                label: dep?.name,
            }));
            // employment status
            const employment_statuses = data.employment_statuses?.map((dep) => ({
                id: dep?.id,
                label: dep?.name,
            }));
            // work shift
            const work_shifts = data.work_shifts?.map((dep) => ({
                id: dep?.id,
                label: dep?.name,
            }));
            // roles
            // const roles = data?.roles
            //     ?.filter((r) => r?.name !== `business_owner#${user?.business_id}`)
            //     ?.map((es) => ({
            //         id: es?.id,
            //         label: `${formatRole(es?.name.split("_")[1].split("#")[0])}`,
            //         value: es?.name,
            //     }));

            // modified data
            const newData = {
                departments,
                work_locations,
                designations,
                employment_statuses,
                work_shifts,
                // roles,
            };

            // console.log(newData);
            return newData;
        },
    });
    return getCombineDataQuery;
}
