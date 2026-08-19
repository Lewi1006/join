

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


/* groupedProfiles ist ein berechnetes Angular-Signal (computed), das automatisch neu berechnet wird, sobald sich this.profiles() ändert: Zuerst wird mit [...this.profiles()] eine Kopie der Profilliste erstellt, damit die ursprüngliche Liste nicht verändert wird; anschließend entfernt filter() alle Profile ohne Namen (eigentlich unnötig weil ja ein Name vorahnden sein muss) und sort() sortiert die übrigen Profile alphabetisch nach user_name. 
Danach wird jedes Profil in einer Map nach dem ersten, großgeschriebenen Buchstaben seines Namens gruppiert: Gibt es für den Buchstaben bereits eine Gruppe, wird diese verwendet, andernfalls wird ein leeres Array angelegt; anschließend wird das Profil hinzugefügt und die Gruppe wieder in der Map gespeichert. 
Zum Schluss wandelt Array.from() die Map in ein Array mit Objekten der Form { letter, profiles } um, damit das Angular-Template die Buchstabengruppen und die jeweils zugehörigen Profile mit @for darstellen kann. */