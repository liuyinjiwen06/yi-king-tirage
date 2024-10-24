<script>
export default {
    data() {
        return {
            readings: [],
            hexagram: null,
            hexagramName: ''
        }
    },
    methods: {
        performReading() {
            if (this.readings.length < 6) {
                const lines = ["yin", "yang"];
                const newReading = lines[Math.floor(Math.random() * 2)];
                this.readings.push(newReading);
                
                if (this.readings.length === 6) {
                    this.calculateHexagram();
                }
            }
        },
        calculateHexagram() {
            const binaryString = this.readings.map(r => r === 'yang' ? '1' : '0').join('');
            const hexagramNumber = parseInt(binaryString, 2) + 1;
            this.hexagram = hexagramNumber;
            this.hexagramName = this.getHexagramName(hexagramNumber);
        },
        getHexagramName(number) {
            const hexagrams = {
                1: "L'Élan Créatif", 2: "Le Réceptif", 3: "La Difficulté Initiale",
                4: "La Folie Juvénile", 5: "L'Attente", 6: "Le Conflit",
                7: "L'Armée", 8: "La Solidarité", 9: "Le Pouvoir d'Apprivoisement du Petit",
                10: "La Marche", 11: "La Paix", 12: "L'Immobilité",
                13: "Communauté avec les Hommes", 14: "Le Grand Avoir", 15: "L'Humilité",
                16: "L'Enthousiasme", 17: "La Suite", 18: "Le Travail sur ce qui est Corrompu",
                19: "L'Approche", 20: "La Contemplation", 21: "Mordre au Travers",
                22: "La Grâce", 23: "L'Éclatement", 24: "Le Retour",
                25: "L'Innocence", 26: "Le Pouvoir d'Apprivoisement du Grand", 27: "Les Commissures des Lèvres",
                28: "La Prépondérance du Grand", 29: "L'Insondable", 30: "Le Feu",
                31: "L'Influence", 32: "La Durée", 33: "La Retraite",
                34: "La Puissance du Grand", 35: "Le Progrès", 36: "L'Obscurcissement de la Lumière",
                37: "La Famille", 38: "L'Opposition", 39: "L'Obstacle",
                40: "La Libération", 41: "La Diminution", 42: "L'Augmentation",
                43: "La Résolution", 44: "Venir à la Rencontre", 45: "Le Rassemblement",
                46: "La Poussée vers le Haut", 47: "L'Accablement", 48: "Le Puits",
                49: "La Révolution", 50: "Le Chaudron", 51: "L'Éveilleur",
                52: "L'Immobilisation", 53: "Le Développement", 54: "L'Épousée",
                55: "L'Abondance", 56: "Le Voyageur", 57: "Le Doux",
                58: "Le Serein", 59: "La Dispersion", 60: "La Limitation",
                61: "La Vérité Intérieure", 62: "La Prépondérance du Petit", 63: "Après l'Accomplissement",
                64: "Avant l'Accomplissement"
            };
            return hexagrams[number] || `Hexagramme ${number}`;
        }
    }
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8">Yi King Tirage</h1>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Consultation de l'Oracle Chinois</div>
                <p class="mt-2 text-gray-500">Cliquez sur le bouton ci-dessous pour effectuer un tirage Yi King. Vous aurez six tirages pour former votre hexagramme.</p>
                <button @click="performReading" :disabled="readings.length >= 6" class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Tirer une ligne ({{ 6 - readings.length }} restantes)
                </button>
                <div v-if="readings.length > 0" class="mt-4">
                    <h2 class="text-xl font-semibold">Vos tirages :</h2>
                    <div class="flex flex-col items-center mt-2">
                        <div v-for="(reading, index) in readings" :key="index" class="w-32 my-1">
                            <div v-if="reading === 'yang'" class="h-2 bg-black"></div>
                            <div v-else class="flex justify-between">
                                <div class="h-2 bg-black w-14"></div>
                                <div class="h-2 bg-black w-14"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="readings.length === 6" class="mt-6">
                    <h2 class="text-2xl font-bold">Résultat final :</h2>
                    <p class="text-lg mt-2">Hexagramme {{ hexagram }}</p>
                    <p class="mt-2">{{ hexagramName }}</p>
                    <div class="flex justify-center mt-4">
                        <div class="w-32">
                            <div v-for="(reading, index) in readings" :key="index" class="my-1">
                                <div v-if="reading === 'yang'" class="h-2 bg-black"></div>
                                <div v-else class="flex justify-between">
                                    <div class="h-2 bg-black w-14"></div>
                                    <div class="h-2 bg-black w-14"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>