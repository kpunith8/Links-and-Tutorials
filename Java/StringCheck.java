package com.code.exercise3;

import java.util.Scanner;

public class StringCheck {

	public static void main(String[] args) {

		String S, T;
		Scanner input = new Scanner(System.in);

		System.out.println("Enter first string(S): ");
		S = input.nextLine();

		System.out.println("Enter Second String(T): ");
		T = input.nextLine();

		String sol = solution(S, T);

		System.out.println();
		System.out.println(sol);
	}

	public static String solution(String S, String T) {

		String subStringT = "";
		String subStringS = "";
		String reverseT = "";
	
		// Check strings for eqality
		if (T.equalsIgnoreCase(S)) {

			return "NOTHING";
		}
		
		// Check for Deletion of a char
		if ((S.length() - T.length()) == 1)

		{

			for (int i = 0; i < T.length() && i < S.length(); ++i) {
				if (T.charAt(i) != S.charAt(i)) {
					return "DELETE " + S.charAt(i);
				}
			}
		} 
		
		// Check for New Insertion made in T
		if ((T.length() - S.length()) == 1){
			for (int i = 0; i < T.length() && i < S.length(); ++i) {
				if (T.charAt(i) != S.charAt(i)) {
					return "INSERT " + T.charAt(i);
				}
			}
		}

		if ((T.length() - S.length()) >= 1) {
			return "IMPOSSIBLE";
		} else {
			for (int i = 0; i < T.length() - 1; i++) {
				
				subStringS = S.substring(i, i + 2);
				subStringT = T.substring(i, i + 2);

				reverseT = new StringBuffer(subStringT).reverse().toString();

				if (reverseT.equals(subStringS)) {
					return "SWAP " + subStringS;
				}
			}
		}

		return "IMPOSSIBLE";
	}
}