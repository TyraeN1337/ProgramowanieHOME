using System;

namespace CountApp
{
    internal class Program
    {
        static void Main(string[] args)
        {

            int drawsCount = ReadInt("Ile zestawów wylosować? ", min: 1, max: 10000);
    
            Random rng = new Random();

            int[,] draws = FillDraws(drawsCount, rng);

            Console.WriteLine();
            Console.WriteLine("Zestawy wylosowanych liczcb:");
            PrintDraws(draws);

            int[] occurrences = CountOccurrences(draws);

            PrintOccurrences(occurrences);
        }

        static int ReadInt(string prompt, int min, int max)
        {
            while (true)
            {
                Console.Write(prompt);
                string? input = Console.ReadLine();

                if (int.TryParse(input, out int value) && value >= min && value <= max)
                    return value;

                Console.WriteLine($"Podaj liczbę całkowitą z zakresu {min}..{max}.");
            }
        }
        static int RandomNumber(Random rng, int minInclusive, int maxInclusive)
            => rng.Next(minInclusive, maxInclusive + 1);
        static int[] DrawOneSet(Random rng)
        {
            int[] set = new int[6];
            bool[] used = new bool[50]; 

            int i = 0;
            while (i < 6)
            {
                int x = RandomNumber(rng, 1, 49);
                if (!used[x])
                {
                    used[x] = true;
                    set[i] = x;
                    i++;
                }
            }

            Array.Sort(set); 
            return set;
        }
        static int[,] FillDraws(int n, Random rng)
        {
            int[,] draws = new int[n, 6];

            for (int row = 0; row < n; row++)
            {
                int[] one = DrawOneSet(rng);
                for (int col = 0; col < 6; col++)
                    draws[row, col] = one[col];
            }

            return draws;
        }
        static void PrintDraws(int[,] draws)
        {
            int n = draws.GetLength(0);
            int k = draws.GetLength(1);

            for (int i = 0; i < n; i++)
            {
                Console.Write($"Losowanie {i + 1,2}: ");
                for (int j = 0; j < k; j++)
                {
                    Console.Write($"{draws[i, j],2} ");
                }
                Console.WriteLine();
            }
        }
        static int[] CountOccurrences(int[,] draws)
        {
            int[] occ = new int[50]; 

            int n = draws.GetLength(0);
            int k = draws.GetLength(1);

            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < k; j++)
                {
                    int val = draws[i, j]; 
                    if (val >= 1 && val <= 49)
                        occ[val]++;
                }
            }

            return occ;
        }
        static void PrintOccurrences(int[] occ)
        {
            for (int i = 1; i <= 49; i++)
                Console.WriteLine($"Wystąpienia liczby {i,2}: {occ[i]}");
        }
    }
}