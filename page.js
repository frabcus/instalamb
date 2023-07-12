function detectPageCategory() {
    if (findDivByText("Message")) {
        return "user";
    }
    return "home";
}


