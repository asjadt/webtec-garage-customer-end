export const createOrgStructureObj = (data) => {
  if (data) {
    return data.map((dep, i) => {
      if (dep?.parent_id) {
        return {
          name: dep?.name,
          className: `level-${i}`,
          attributes: {
            Manager:
              Object.keys(dep?.manager || {}).length > 0
                ? `${dep?.manager?.first_Name} ${
                    dep?.manager?.middle_Name ? dep?.manager?.middle_Name : ""
                  } ${dep?.manager?.last_Name}`
                : `No Manager Found`,
            ["Total Employees"]: dep?.total_users_count,
          },
          children: dep?.recursive_children
            ? createOrgStructureObj(dep?.recursive_children)
            : [],
        };
      } else {
        return {
          name: dep?.name,
          attributes: {
            Owner:
              Object.keys(dep?.manager || {}).length > 0
                ? `${dep?.manager?.first_Name} ${
                    dep?.manager?.middle_Name ? dep?.manager?.middle_Name : ""
                  } ${dep?.manager?.last_Name}`
                : `No Owner Found`,
            ["Total Employees"]: dep?.total_users_count,
          },
          children: dep?.recursive_children
            ? createOrgStructureObj(dep?.recursive_children)
            : [],
        };
      }
    });
  } else {
    return {};
  }
};
