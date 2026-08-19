

// Group the users by the first letter of their name.
    readonly groupedProfiles = computed(() => {
        const groups = new Map<string, Profile[]>();

        // Remove users without a name and sort the remaining users.
        const sortedProfiles = [...this.profiles()]
            .filter((profile) => profile.user_name.trim())
            .sort((first, second) => first.user_name.localeCompare(second.user_name));

        // Add every user to the correct letter group.
        for (const profile of sortedProfiles) {
            const letter = profile.user_name.charAt(0).toUpperCase();

            const users = groups.get(letter) ?? [];

            users.push(profile);
            groups.set(letter, users);
        }

        // Change the Map into an array that the HTML can display.
        return Array.from(groups, ([letter, profiles]) => ({
            letter,
            profiles,
        }));
    });