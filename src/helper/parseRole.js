export const parseRoleToNewRole = (users, newroles) => {
    const newusers = []

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < newroles.length; j++) {
            if (users[i].role.id === j + 1) {
                users[i].role.name = newroles[j]
                newusers.push(users[i])
            }
        }
    }   

    return newusers;

}

export const parseNewRoleToRole = (roles, index) => {
    return roles[index - 1]
}

export const parseNewStatusToStatus = (statuses, index) => {
    return statuses[index - 1]
}