[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ras0k/gistemp4/blob/main/gistemp4.ipynb)

# GISTEMP4.0 Data Processing Pipeline

A Python workflow for processing NASA's GISTEMP v4 global temperature data using original Fortran scientific routines. This pipeline automates data download, preprocessing, and analysis while offering performance optimizations.

## Features

-   Automated download of NASA's official GISTEMP v4 source package
    
-   Compatibility management for legacy scientific code
    
-   Results packaging in standardized formats
    
-   Designed for both local execution and cloud notebook environments
    
## Usage

### Google Colab

1.  Open the [Colab notebook](https://colab.research.google.com/github/ras0k/gistemp4/blob/main/gistemp4.ipynb)
    
2.  Run all cells sequentially

## To-Do List

### High Priority
    
-   ⚡ Implement PyPy3 runtime for faster operations
    
-   🔧 Investigate numpy compatibility issues (temporary fix using v1.23.1)

    

## Results

Processed outputs are packaged in `results.zip` containing:

-   Global temperature anomaly calculations (mixedGLB.Ts.ERSSTV5.GHCN.CL.PA.txt)
    
-   Intermediate processing artifacts
    
-   Diagnostic logs and metadata
    

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ras0k/gistemp4/blob/main/LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

* * *

**NASA Data Notice**: Original scientific routines and input data courtesy of NASA GISS. This project is not affiliated with or endorsed by NASA.

