const getRecipentEmail = (users,userLoggedIn) => (
    users?.filter( userTofilter => userTofilter !== userLoggedIn?.email)[0]
);

export default getRecipentEmail;
