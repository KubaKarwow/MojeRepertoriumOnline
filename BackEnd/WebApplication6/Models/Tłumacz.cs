using System;
using System.Collections.Generic;

namespace WebApplication6.Models;

public partial class Tłumacz
{
    public int UserId { get; set; }

    public int NumerIndeksuTłumacza { get; set; }

    public DateTime DataDołaczenia { get; set; }

    public DateTime? DataOdejścia { get; set; }

    public virtual ICollection<Obsługuje> Obsługujes { get; set; } = new List<Obsługuje>();

    public virtual ICollection<Tłumaczeniewykonane> Tłumaczeniewykonanes { get; set; } = new List<Tłumaczeniewykonane>();

    public virtual User User { get; set; } = null!;
}
